-- List of groups ‘User A’ has a member in
SELECT g.name FROM memberships AS m
INNER JOIN groups AS g ON m.group_id = g.id
INNER JOIN users AS u ON m.user_id=u.id
WHERE u.lname='A' AND u.fname='User'

-- Users with memberships in either GroupA or GroupB
SELECT u.id, u.lname, u.fname FROM users AS u
INNER JOIN memberships AS m ON m.user_id=u.id
INNER JOIN groups AS g ON m.group_id = g.id
WHERE g.name='GroupA' OR g.name='GroupB'
GROUP BY u.id, u.lname, u.fname
ORDER BY u.id, u.lname, u.fname

-- Users with memberships in both GroupA and GroupB
SELECT u.id, u.lname, u.fname FROM groups AS g
INNER JOIN memberships AS m ON m.group_id=g.id
INNER JOIN users AS u ON m.user_id=u.id
WHERE g.name='GroupA'
UNION
SELECT u.id, u.lname, u.fname FROM groups AS g
INNER JOIN memberships AS m ON m.group_id=g.id
INNER JOIN users AS u ON m.user_id=u.id
WHERE g.name='GroupB'
