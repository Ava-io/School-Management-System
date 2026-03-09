import dotenv from "dotenv";
import pg from "pg";
import { createStudentTable } from "../model/CreateStudentTable.js";
import { createUserTable } from "../model/CreateUserTable.js";
import {
  alterPrefectTable,
  alterTables,
  removeUserTables,
} from "../model/AlterTables.js";
import { createSchoolTable } from "../model/CreateSchoolTable.js";
import { createAnnouncementTable } from "../model/CreateAnnoucementTable.js";
import { createDepartmentTable } from "../model/CreateDepartmentTable.js";
import { createClassTable } from "../model/CreateClassTable.js";
import { createSubjectTable } from "../model/CreateSubjectTable.js";
import { createAssignmentTable } from "../model/CreateAssignmentTable.js";
import { createTeachersTable } from "../model/CreateTeachersTable.js";
import { createPrefectTable } from "../model/CreatePrefectTable.js";

dotenv.config();

console.log(process.env.DB_PORT);

export const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// const create studentTable = awa

export const initDb = async () => {
  try {
    const client = await pool.connect();

    /*
     * school
     * users
     * announcement
     * dept
     * class
     * subject
     * assignment
     * student
     * teacher
     *
     *
     *
     * ALTERS
     */

    // CREATE TABLES
    await client.query(createSchoolTable);
    console.log("school table created successfully");

    await client.query(createUserTable);
    console.log(" user table created successfully");

    await client.query(createAnnouncementTable);
    console.log("announcement table created successfully");

    await client.query(createDepartmentTable);
    console.log("department table created successfully");

    await client.query(createClassTable);
    console.log("class table created successfully");

    await client.query(createSubjectTable);
    console.log("subject table created successfully");

    await client.query(createStudentTable);
    console.log("student table created successfully");

    await client.query(createTeachersTable);
    console.log("teachers table created successfully");

    await client.query(createAssignmentTable);
    console.log("assignnment table created successfully");

    await client.query(createPrefectTable);
    console.log("prefect table created successfully");

    // ALTER TABLES
    await client.query(alterTables);
    console.log("student tables altered successfully");

    await client.query(alterPrefectTable);
    console.log("prefect tables altered successfully");
    client.release();

    // // DROP STUDENT TABLE COLUMN
    // await client.query(removeUserTables);
    // console.log("origin column removed successfully");
  } catch (error) {
    console.log(error, "Database not connected");
  }
};
