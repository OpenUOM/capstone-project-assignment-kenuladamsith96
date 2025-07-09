const dbConnection = require("./sqlite");

dbConnection
  .getDbConnection()
  .then((db) => {
    init(db);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

let _db;

function init(db) {
    _db = db;
}

const knex_db = require("./db-config");

const dbinitialize = async () => {
    testBase.resetDatabase(knex_db);
}

const readTeachers = async () => {
    const sql = `SELECT * FROM teacher`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((teachers) => {
                resolve(teachers);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const readTeacherInfo = async (id) => {
    const sql = `SELECT * FROM teacher WHERE id = ?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id])
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const addTeacher = async (id, name, age) => {
    const sql = `INSERT INTO teacher(id,name,age) values (?, ?, ?)`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id, name, age])
            .then(() => {
                resolve({status: "Successfully inserted Teacher"})
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const updateTeacher = async (name, age, id) => {
    // First, get existing student data
    const existing = await knex_db('teacher').where({ id }).first();

    // Fallback to existing values if empty
    const newName = name !== '' ? name : existing.name;
    const newAge = age !== '' ? age : existing.age;

    const sql = `UPDATE teacher SET name=?, age=? WHERE id=?`;

    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [newName, newAge, id])
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const deleteTeacher = async (id) => {
    const sql = `DELETE FROM teacher WHERE id = ?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id])
            .then(() => {
                resolve({status: "Successfully deleted Teacher"})
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const readStudents = async () => {
    const sql = `SELECT * FROM student`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const readStudentInfo = async (id) => {
    const sql = `SELECT * FROM student  WHERE id = ? `
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [id])
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const addStudent = async (id, name, age, hometown) => {
    const sql = `INSERT INTO student(id,name,age,hometown) values (?, ?, ?,?)`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql,[id,name,age,hometown])
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

const updateStudent = async (name, age, hometown, id) => {
    // First, get existing student data
    const existing = await knex_db('student').where({ id }).first();

    // Fallback to existing values if empty
    const newName = name !== '' ? name : existing.name;
    const newAge = age !== '' ? age : existing.age;
    const newHometown = hometown !== '' ? hometown : existing.hometown;

    const sql = `UPDATE student SET name=?, age=?, hometown=? WHERE id=?`;

    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql, [newName, newAge, newHometown, id])
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};


const deleteStudent = async (id) => {
    const sql = `DELETE FROM student WHERE id = ?`
    return new Promise((resolve, reject) => {
        knex_db
            .raw(sql,[id])
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

module.exports = {
    readTeachers,
    dbinitialize,
    readStudents,
    addStudent,
    addTeacher,
    deleteTeacher,
    deleteStudent,
    readStudentInfo,
    readTeacherInfo,
    updateStudent,
    updateTeacher
};
