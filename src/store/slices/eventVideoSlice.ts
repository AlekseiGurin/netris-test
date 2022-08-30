import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../store/store';
//import { fetchCount } from './counterAPI';

export interface EventVideoState {
    selectedVideoId: number | undefined
}



const initialState: EventVideoState = {
    selectedVideoId: undefined
};

// Приведенная ниже функция называется thunk и позволяет нам выполнять асинхронную логику. Это
// можно отправить как обычное действие: `dispatch(incrementAsync(10))`. Этот
// вызовет преобразователь с функцией `dispatch` в качестве первого аргумента. Асинхронный
// затем код может быть выполнен и другие действия могут быть отправлены. Преобразователи
// обычно используется для выполнения асинхронных запросов.
// export const incrementAsync = createAsyncThunk(
//     'counter/fetchCount',
//     async (amount: number) => {
//         const response = await fetchCount(amount);
//         // The value we return becomes the `fulfilled` action payload
//         return response.data;
//     }
// );

export const eventVideoSelectorSlice = createSlice({
    name: 'eventVideoSelector',
    initialState,
// Поле `reducers` позволяет нам определять редьюсеры и генерировать связанные действия
    reducers: {
        selectedEventVideo: (state) => {

        }
        // increment: (state) => {
        //     // Redux Toolkit позволяет нам писать «мутирующую» логику в редьюсерах. Это
        //     // на самом деле не мутирует состояние, потому что использует библиотеку Immer,
        //     // который обнаруживает изменения в "состоянии черновика" и создает совершенно новый
        //     // неизменное состояние, основанное на этих изменениях
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // // Используйте тип PayloadAction для объявления содержимого action.payload.
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
    },
    // Поле `extraReducers` позволяет срезу обрабатывать действия, определенные в другом месте,
    // включая действия, сгенерированные createAsyncThunk или другими слайсами.
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(incrementAsync.pending, (state) => {
    //             state.status = 'loading';
    //         })
    //         .addCase(incrementAsync.fulfilled, (state, action) => {
    //             state.status = 'idle';
    //             state.value += action.payload;
    //         })
    //         .addCase(incrementAsync.rejected, (state) => {
    //             state.status = 'failed';
    //         });
    // },
});

//export const { increment, decrement, incrementByAmount } = eventVideoSelectorSlice.actions;

// Приведенная ниже функция называется селектором и позволяет нам выбрать значение из
// штат. Селекторы также могут быть определены встроенными, где они используются вместо
// в файле среза. Например: `useSelector((состояние: RootState) => состояние.счетчик.значение)`
export const selectCount = (state: RootState) => state.counter.value;

// Мы также можем вручную написать переходники, которые могут содержать как синхронную, так и асинхронную логику.
// Вот пример условной отправки действий на основе текущего состояния.
// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//         (dispatch, getState) => {
//             const currentValue = selectCount(getState());
//             if (currentValue % 2 === 1) {
//                 dispatch(incrementByAmount(amount));
//             }
//         };

export default eventVideoSelectorSlice.reducer;