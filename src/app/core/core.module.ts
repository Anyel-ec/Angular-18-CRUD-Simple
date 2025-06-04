import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  /*
   * Prevent re-importing the CoreModule. If it is already loaded, throw an error.
   * This ensures CoreModule is only imported in AppModule.
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only in AppModule.');
    }
  }
}
