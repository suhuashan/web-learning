function chen(x, y) {
    x = x + '';
    y = y + '';
    if (x.length > y.length) {
        [x, y] = [y, x];
    }
    let arr1 = x.split('').reverse();
    let arr2 = y.split('').reverse();
    let all = [];
    let carry = 0;
    for (let i = 0; i < arr1.length; i++) {
        all[i] = [];
        for (let j = 0; j < arr2.length; j++) {
            all[i][j] = (~~arr2[j]) * (~~arr1[i]) + carry;
            if (all[i][j] >= 10) {
                carry = all[i][j] % 10;
                all[i][j] = parseInt(all[i][j] / 10);
            }
            if (carry >= 1 && j === (arr1.length - 1)) {
                all[i][arr2.length] = carry;
            }
        }
        carry = 0;
        for (let n = 0; n < i; n++) {
            all[i].unshift('0');
        }
        all[i] = ~~(all[i].reverse().join(''));
    }
    let temp = 0;
    for (let m = 0; m < all.length; m++) {
        temp = add(temp, all[m])
    }
    return temp;
}

function add(x, y) {
    x = x + '';
    y = y + '';
    if (x.length < y.length) {
        [x, y] = [y, x];
    }
    let carry = 0;
    let arr1 = x.split('').reverse();
    let arr2 = y.split('').reverse();
    for (let i = 0; i < arr1.length; i++) {
        if (arr2[i]) {
            arr1[i] = ~~(arr1[i]) + ~~(arr2[i]) + carry;
        } else {
            arr1[i] = ~~(arr1[i]) + carry;
        }
        if (arr1[i] >= 10) {
            [arr1[i], carry] = [arr1[i] % 10, 1];
        } else {
            carry = 0;
        }
    }
    if (carry === 1) {
        arr1[arr1.length] = carry;
    }
    return ~~(arr1.reverse().join(''));
}
// console.log(chen(100,1))
console.log(chen(99,2))
// console.log(chen(10,10))
// console.log(chen("10000000000000",'10'))