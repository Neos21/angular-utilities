import { FontFamilyTesterModule } from './font-family-tester.module';

describe('FontFamilyTesterModule', () => {
  let fontFamilyTesterModule: FontFamilyTesterModule;
  
  beforeEach(() => {
    fontFamilyTesterModule = new FontFamilyTesterModule();
  });
  
  it('should create an instance', () => {
    expect(fontFamilyTesterModule).toBeTruthy();
  });
});
