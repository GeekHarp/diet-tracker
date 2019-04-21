// If you need to deal with DB
module.exports = (dbPoolInstance) => {
    let newUser = (values, callback) => {
        // Insert data into DB..
        let query = 'INSERT INTO users (username, password) VALUES ($1, $2)';
        dbPoolInstance.query(query, values, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {
                    callback(null, null);
                }
            }
        });
    };

    let idAndPasswordCheck = (query, hash, callback) => {
        dbPoolInstance.query(query, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                // if username is in our DB
                if (queryResult.rows.length === 1) {
                    const user = queryResult.rows[0];
                    if (hash === user.password) {
                        // Password is CORRECT!
                        callback(null, user)
                    } else {
                        // Wrong Password
                        console.log(`Wrong Password`);
                        callback(null, null);
                    }
                } // else username not valid..?
                else {
                    callback(null, null);
                }
            }
        })
    };

    return {
        newUser,
        idAndPasswordCheck
    };
};