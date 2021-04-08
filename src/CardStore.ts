import { action, makeObservable, observable, runInAction, configure } from "mobx";

configure({
    enforceActions: 'never'
})

export class CardStoreImpl {
    result: any[] = [];
    loading: boolean = false;

    constructor() {
        makeObservable(this, {
            fetchList: action,
            result: observable,
            loading: observable,
        })
    }

    fetchList = action(async() => {
        this.loading = true;
        try {
            const query = await fetch('https://gist.githubusercontent.com/paulmillr/4524946/raw/c462a62ac9f3a072fc4106bbd131335ad730da16/github-users-stats.json');
            const res = await query.json();            
            runInAction(() => this.result = res)
            this.loading = false;
            
        } catch(error) {
            console.log('Error', error)
        }
    })
};

export const CardStore = new CardStoreImpl();