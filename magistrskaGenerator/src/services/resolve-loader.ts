export const SERVICE_RESOLVE_LOADER = [
    {
        'tag': 'serviceResolveLoader',
        'value': 'Generate Resolve Loader service',
        'ts':
`import { inject, Injectable } from '@angular/core';
import { ResolveEnd, ResolveStart, Router } from '@angular/router';
import { Observable, filter, map, merge } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResolveLoaderService {
  private router: Router = inject(Router);

  // Handles visibility of the progress bar component
  public handleLoaderVisibility$(): Observable<boolean> {
    const showLoader$: Observable<boolean> = this.router.events.pipe(
      filter((event: any): boolean => event instanceof ResolveStart),
      map((): boolean => true)
    );

    const hideLoader$: Observable<boolean> = this.router.events.pipe(
      filter((event: any): boolean => event instanceof ResolveEnd),
      map((): boolean => false)
    );

    return merge(hideLoader$, showLoader$);
  }
}
`
    }
];