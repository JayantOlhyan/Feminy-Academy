import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { z } from 'zod';

function load(path, deps = {}, globals = {}) {
  const code = ts.transpileModule(fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  const exports = {};
  vm.runInNewContext(code,{exports,require:key=>{assert.ok(key in deps);return deps[key];},URL,Date,AbortSignal,Response,...globals});
  return exports;
}
const pricing = load('lib/offer-pricing.ts');
const start = Date.parse(pricing.priceSchedule.startsAt);
function fixture() {
  const calls = [];
  const env = {NODE_ENV:'production',COURSE_PLATFORM_URL:'https://learning.example.com',COURSE_PLATFORM_HANDOFF_ENABLED:'true'};
  let payload = {course:{slug:'hydra-facial',pricePaise:300000,currency:'INR'}};
  let ok = true;
  const mod = load('lib/course-platform.ts', {zod:{z},'@/lib/offer-pricing':pricing}, {process:{env},fetch:async(url,options)=>{calls.push({url,options});return{ok,json:async()=>payload};}});
  return {mod,env,calls,setPayload(value){payload=value;},fail(){ok=false;}};
}
test('disabled or undeployed platform cannot take payments or trigger outbound calls',async()=>{
  const f=fixture();f.env.COURSE_PLATFORM_HANDOFF_ENABLED='false';
  assert.equal((await f.mod.getCourseHandoff('hydra-facial',start)).status,'not-configured');
  f.env.COURSE_PLATFORM_HANDOFF_ENABLED='true';delete f.env.COURSE_PLATFORM_URL;
  assert.equal((await f.mod.getCourseHandoff('hydra-facial',start)).status,'not-configured');assert.equal(f.calls.length,0);
});
test('handoff maps each marketing course to the actual platform slug',async()=>{
  const f=fixture();
  assert.equal((await f.mod.getCourseHandoff('hydra-facial',start)).url,'https://learning.example.com/courses/hydra-facial');
  f.setPayload({course:{slug:'one-day-masterclass',pricePaise:100000,currency:'INR'}});
  assert.equal((await f.mod.getCourseHandoff('one-day',start)).url,'https://learning.example.com/courses/one-day-masterclass');
  assert.equal(f.calls[1].url,'https://learning.example.com/api/courses/one-day-masterclass');
  assert.equal(f.calls[1].options.cache,'no-store');assert.equal(f.calls[1].options.redirect,'error');assert.equal(f.calls[1].options.headers,undefined);
});
test('fixed backend fee cannot silently undercharge after a scheduled increase',async()=>{
  const f=fixture();const boundary=start+pricing.priceSchedule.intervalMs;
  assert.equal((await f.mod.getCourseHandoff('hydra-facial',boundary-1)).status,'ready');
  assert.equal((await f.mod.getCourseHandoff('hydra-facial',boundary)).status,'price-mismatch');
  f.setPayload({course:{slug:'hydra-facial',pricePaise:330000,currency:'INR'}});
  assert.equal((await f.mod.getCourseHandoff('hydra-facial',boundary)).status,'ready');
});
test('wrong course, non-INR, malformed data and backend failure all block checkout',async()=>{
  const f=fixture();
  for(const payload of [{course:{slug:'wrong',pricePaise:300000,currency:'INR'}},{course:{slug:'hydra-facial',pricePaise:300000,currency:'USD'}},{course:{slug:'hydra-facial',pricePaise:'300000',currency:'INR'}},{}]){
    f.setPayload(payload);assert.equal((await f.mod.getCourseHandoff('hydra-facial',start)).status,'unavailable');
  }
  f.fail();assert.equal((await f.mod.getCourseHandoff('hydra-facial',start)).status,'unavailable');
});
test('platform configuration rejects unsafe schemes, credentials, paths and production HTTP',()=>{
  const {mod}=fixture();
  assert.equal(mod.platformOrigin('https://learning.example.com',false),'https://learning.example.com');
  assert.equal(mod.platformOrigin('http://localhost:5173',true),'http://localhost:5173');
  for(const url of ['javascript:alert(1)','http://learning.example.com','http://localhost:5173','https://user:pass@learning.example.com','https://learning.example.com/path','https://learning.example.com?token=x','https://learning.example.com/#fragment'])assert.throws(()=>mod.platformOrigin(url,false));
});
test('retired standalone endpoint always refuses to create an unlinked payment',async()=>{
  const route=load('app/api/payments/link/route.ts');const response=await route.POST();
  assert.equal(response.status,410);assert.match((await response.json()).error,/learning platform/);
});

test('platform comparison uses integer paise for compounded fractional-rupee fees', async () => {
  const f=fixture();f.setPayload({course:{slug:'hydra-facial',pricePaise:439230,currency:'INR'}});
  assert.equal((await f.mod.getCourseHandoff('hydra-facial',start+4*pricing.priceSchedule.intervalMs)).status,'ready');
});
