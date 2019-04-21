module.exports = (dbPoolInstance) => {
    const selectUser = (query, callback) => {
        dbPoolInstance.query(query, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                // if username exist in DB
                if (queryResult.rows.length === 1) {
                    callback(null, queryResult.rows[0]);
                } else {
                    callback(null, null);
                }
            }
        })
    };

    const insertData = (secondQuery, callback) => {
        dbPoolInstance.query(secondQuery, (error, queryResult) => {
            // ERROR. check your query, etc
            if (error) {
                callback(error, null);
            } else {
                // DB did something..
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                    console.log(`New User's Data Inserted`);
                } else {
                    callback(null, null);
                }
            }
        })
    };

    return {
        selectUser,
        insertData
    }
}