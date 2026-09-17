import pool from "../config/db.config.js";

// 1. Lấy tất cả users (kèm sắp xếp an toàn)
// asc - ascending: tăng dần
// ({} = {}): phân rã đối tượng, ={} cho phép truyền danh sách rỗng
export const findAll = async ({ sortBy = "id", order = "asc" } = {} ) => {
  const validSortColumns = ["id", "name", "email", "age"]; // danh sách trắng
  if (!validSortColumns.includes(sortBy)) { //kiểm tra dữ liêu người dùng gửi lên có nằm trong danh sách trắng ko (đủ cột dữ liệu)
    throw new Error(`Invalid sort column: ${sortBy}`);
  }

  const validOrder = ["asc", "desc"];
  if (!validOrder.includes(order.toLowerCase())) {
    throw new Error(`Invalid order: ${order}`);
  }

  const result = await pool.query(
    `SELECT * FROM users ORDER BY ${sortBy} ${order.toUpperCase()}`
  );
  return result.rows;
};

// 2. Tìm user theo ID
export const findById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] || null;
};

// 3. Tìm user theo Email (thường dùng để check trùng email)
export const findByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0] || null;
};

// 4. Tạo mới user và trả về bản ghi vừa tạo
export const create = async ({ name, email, age }) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, age) 
     VALUES ($1, $2, $3) 
     RETURNING *`,
    [name, email, age]
  );
  return result.rows[0];
};

// 5. Cập nhật linh hoạt với COALESCE (nếu giá trị truyền vào là null/undefined thì giữ nguyên giá trị cũ trong DB)
export const update = async (id, { name, email, age }) => {
  const result = await pool.query(
    `UPDATE users 
     SET name = COALESCE($1, name),
         email = COALESCE($2, email),
         age = COALESCE($3, age)
     WHERE id = $4
     RETURNING *`,
    [name ?? null, email ?? null, age ?? null, id]
  );
  return result.rows[0] || null;
};

// 6. Xóa user theo ID và trả về bản ghi vừa bị xóa
export const deleteById = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0] || null;
};