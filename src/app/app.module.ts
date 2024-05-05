import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ɵPLATFORM_BROWSER_ID } from '@angular/common';
import bootstrap from '../main.server';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
    
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]

})

export default AppModule {}; 