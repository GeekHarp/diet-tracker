// If you need to deal with DB
module.exports = (dbPoolInstance) => {
    let newUser = (values, query, callback) => {
        //Before inserting new user into DB
        //check if username was taken
        dbPoolInstance.query(query, (error, queryResult) => {
            if (error) {
                callback(error, null)
            } else {
                //if username exist in db
                if (queryResult.rows.length > 0) {
                    callback(null, `taken`);
                } else {
                    let secondQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)';
                    dbPoolInstance.query(secondQuery, values, (error, queryResult) => {
                        // queryResult not really needed for this
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
                }
            }
        })
    };

    let idAndPasswordCheck = (query, hashedPw, callback) => {
        dbPoolInstance.query(query, (error, queryResult) => {
            //
            if (error) {
                callback(error, null);
            } else {
                // if username is in our DB
                if (queryResult.rows.length === 1) {
                    const user = queryResult.rows[0];
                    if (hashedPw === user.password) {
                        // Password is CORRECT!
                        callback(null, user)
                    } else {
                        // Wrong Password
                        callback(null, null);
                    }
                } // else username not valid..?
                else {
                    callback(null, null);
                }
            }
        })
    };

    // let firstTimeUserCheck = () => {
    //     dbPoolInstance.query
    // }

    return {
        newUser,
        idAndPasswordCheck
    };
};