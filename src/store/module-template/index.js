import state from './state';
import * as actions from "./action";
import * as getters from "./getters";
import * as mutations from "./mutations";

const myCustomModule = {
    namespace: true,
    actions,
    getters,
    mutations,
    state
}


export default myCustomModule;