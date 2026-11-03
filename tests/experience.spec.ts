import {test,expect} from '@playwright/test';
test('offline preview renders both scenes and keyboard inspection works',async({page})=>{
 const external:string[]=[],errors:string[]=[];
 await page.route('**/*',route=>{const url=route.request().url();if(url.startsWith('http')&&!url.startsWith('http://127.0.0.1:3316')){external.push(url);return route.abort();}return route.continue();});
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto('/');await expect(page.locator('canvas')).toHaveCount(2);
 await page.locator('#software').scrollIntoViewIfNeeded();
 const pin=page.getByRole('button',{name:'Inspect Sediment Drift'});await pin.focus();await page.keyboard.press('Enter');
 await expect(pin).toHaveAttribute('aria-pressed','true');
 await expect(page.getByText('Monitoring only')).toBeVisible();
 expect(errors).toEqual([]);expect(external).toEqual([]);
});
test('mobile menu opens, navigates and restores focus',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 const trigger=page.getByRole('button',{name:'Open menu'});await trigger.click();
 await expect(page.locator('#mobile-menu')).toBeVisible();await page.keyboard.press('Escape');
 await expect(trigger).toBeFocused();await expect(trigger).toHaveAttribute('aria-expanded','false');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
});
test('unavailable WebGL leaves readable page and inspection details',async({page})=>{
 await page.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type:string,...args:unknown[]){if(type.includes('webgl'))return null;return Reflect.apply(original,this,[type,...args]);} as typeof original;});
 await page.goto('/');await expect(page.getByText('3D preview requires WebGL.',{exact:false})).toBeVisible();
 await expect(page.locator('#software-title')).toHaveText('Software');
});
