db.createUser(
        {
            user: "adm",
            pwd: "123",
            roles: [
                {
                    role: "readWrite",
                    db: "rentabook_db"
                }
            ]
        }
);