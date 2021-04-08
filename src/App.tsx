import React, { lazy, Suspense } from 'react';
import { CardStore } from './CardStore';

const CardList = lazy(() => import('./CardList')
    .then(({ CardList }) => ({ default: CardList })));

function App() {
    return (
        <div className="App">
            <Suspense fallback={<div>Loading Component</div>}>
                <CardList todoStore={CardStore} />
            </Suspense>

        </div>
    );
}

export default App;