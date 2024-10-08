import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, Middleware} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { refreshToken } from "../auth";
import { checkResponse } from "../../utils/checkResponse";


export type TWsActionTypes<S, R> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    sendMessage?: ActionCreatorWithPayload<S>;
    onConnecting?: ActionCreatorWithoutPayload;
    onOpen: ActionCreatorWithoutPayload;
    onClose: ActionCreatorWithoutPayload;
    onError: ActionCreatorWithPayload<string>;
    onMessage: ActionCreatorWithPayload<R>;
}

export const socketMiddleware = <S, R>(wsActions: TWsActionTypes<S, R>, withTokenRefresh: boolean = false): Middleware<{}, RootState> => {
    return store => {
        let socket: WebSocket | null = null;

        const {
            connect,
            disconnect,
            sendMessage,
            onConnecting,
            onOpen,
            onClose,
            onError,
            onMessage
        } = wsActions
        let url = "";

        return next => action => {
            const { dispatch } = store;

            if (connect.match(action)) {
                socket = new WebSocket(action.payload)
                onConnecting && dispatch(onConnecting())
                url = action.payload;

                socket.onopen = () => {
                    dispatch(onOpen())
                }

                socket.onerror = () => {
                    dispatch(onError("Error"))
                }

                socket.onclose = () => {
                    dispatch(onClose())
                }

                socket.onmessage = (e) => {
                    const { data } = e;
                    try {
                        const parseData = JSON.parse(data)
                        if (parseData.message === "Invalid or missing token") {
                            refreshToken().then(checkResponse)
                                .then((refreshData)  => {
                                    const wssUrl = new URL(url);
                                    refreshData && wssUrl.searchParams.set(
                                        "token",
                                        refreshData.accessToken.replace("Bearer ","")
                                    );
                                    dispatch(connect(wssUrl.toString()));
                                })
                                .catch(err => {
                                    dispatch(onError((err as Error).message))
                                })

                            dispatch(disconnect());

                            return;
                        }
                        dispatch(onMessage(parseData))
                    } catch (err) {
                        dispatch(onError((err as Error).message))
                    }
                }
            }

            if (socket && sendMessage?.match(action)) {
                try {
                    socket.send(JSON.stringify(action.payload))
                } catch (err) {
                    dispatch(onError((err as Error).message))
                }
            }

            if (socket && disconnect.match(action)) {
                socket.close()
                socket = null
            }

            next(action);
        }
    }
}