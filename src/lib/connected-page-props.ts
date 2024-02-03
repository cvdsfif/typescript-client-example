import { simpleApiS } from "shared/api-definition";
import { ApiImplementation } from "typizator";

export type Freezer = {
    freeze: () => void,
    unfreeze: () => void
}

export type ConnectedPageProps = {
    api: ApiImplementation<typeof simpleApiS>,
    freezer: Freezer
}