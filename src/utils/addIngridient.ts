export const addIngredients = <T extends { _id: string }, U>(fstArray: T[], scndArray: U[]) => {
    const array: T[] = [];

    const findIntersection = (fstArray: T[], scndArray: U[]) => {
        fstArray.forEach(item => {
            scndArray.forEach(id => {
                if (item._id === id) {
                    array.push(item);
                }
            });
        });
    };
    findIntersection(fstArray, scndArray);

    return array;
};