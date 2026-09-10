// bọc try catch
const catchAsync = (fn) => {
    return (req, res, next) => { // trả về 1 hàm middleware chuẩn
        // thực hiện hàm async trong controller và nếu có lỗi thì bắt err đẩy vào hàm next truyền tới middleware xử lí
        fn(req, res, next).catch(next); 
    };
};

export default catchAsync;