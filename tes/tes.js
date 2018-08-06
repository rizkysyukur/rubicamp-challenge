db.bread.insertOne({string: "Angri", integer: 24, float: 24.1, date: new Date(), boolean:true})
db.bread.insertOne({string: "Angri", integer: 24, float: 24.1, date: new Date(), boolean:true})
db.bread.insertOne({string: "Angri", integer: 24, float: 24.1, date: new Date(), boolean:true})
db.bread.insertOne({string: "Angri", integer: 24, float: 24.1, date: new Date(), boolean:true})
db.bread.insertOne({string: "Angri", integer: 24, float: 24.1, date: new Date(), boolean:true})
db.bread.insertOne({string: "Angri", integer: 24, float: 24.1, date: new Date(), boolean:true})
db.bread.insertOne({string: "Angri", integer: 24, float: 24.1, date: new Date(), boolean:true})


SELECT projectid, array_to_string(array_agg(distinct "userid"),', ') AS Member FROM members GROUP BY projectid;

SELECT projects.projectid AS id, name, array_to_string(array_agg(distinct "firstname"),', ') AS member 
FROM members, users, projects
WHERE members.userid=users.userid
AND members.projectid=projects.projectid
GROUP BY name, projects.projectid;
