module.exports = (dbPoolInstance) => {

    const selectData = (query, callback) => {
        dbPoolInstance.query(query, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                // Exist in DB?
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0]);
                } else {
                    // No result..
                    callback(null, {
                        weight : 0,
                        gender : `female`,
                        activity_level : `light`,
                        diet_goal : `maintain`
                    });
                }
            }
        })
    };

    const selectMultipleData = (query, callback) => {
        dbPoolInstance.query(query, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    // This will return an arr of 'calories'
                    // console.log(`******************************`);
                    // console.log(`Inside models = ${queryResult.rows}`); // [{}, {}]
                    callback(null, queryResult.rows);
                } else {
                    callback(null, [{
                        calories : 0
                    }]);
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

                    callback(null, queryResult.rows[0]);
                    console.log(`New Data Inserted`);
                } else {
                    callback(null, null);
                }
            }
        })
    };

    return {
        selectData,
        selectMultipleData,
        insertData
    }
}