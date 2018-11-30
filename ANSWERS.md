<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_? 
Sessions are a way to store data for a user. The data is paired with a unique session ID. The session can persist state information between page requests. When you dont have a ID or a cookie, the server will generate a new session. This is useful for pages that you need to login to, so you dont have to login everytime you hange a page

2. What does bcrypt do to help us store passwords in a secure manner.
bcrypt is a password hashing function. when you pass in a plain text password, bcrypt will run it through its algorithm and return a big string of differenct charecters.


3. What does bcrypt do to slow down attackers?
the original password can be hashed multiple times, so the hacker has to spend more time guessing the truw hash

4. What are the three parts of the JSON Web Token?
Header, Payload, Signature
