import { ApplicationRef, NgModuleRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';

export const hmrBootstrap = (
  module: any,
  bootstrap: () => Promise<NgModuleRef<any>>
) => {
  let ngModule: NgModuleRef<any>;
  module.hot.accept();

  bootstrap()
    .then(mod => (ngModule = mod))
    .catch(error => console.log(error));

  module.hot.dispose(() => {
    const appRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);

    ngModule.destroy();
    makeVisible();
  });
};
