create TABLE IF NOT EXISTS questionlist(questionID INT, question TEXT, answera TEXT, answerb TEXT, answerc TEXT, answerd TEXT, answertype TEXT, rights INT)

insert IGNORE INTO questionlist(question, answera, answerb, answerc, answerd, answertype) VALUES (1, 'Was bedeutet road?', 'Strasse', 'Rad', 'Luft', 'Reden', 'text', 0)
insert IGNORE INTO questionlist(question, answera, answerb, answerc, answerd, answertype) VALUES (2, 'A', 'A', 'C', 'F', 'D', 'sheet', 0)
insert IGNORE INTO questionlist(question, answera, answerb, answerc, answerd, answertype) VALUES (3, 'x^2+x^2', '2x^2', '3x', '4x', '3x^2', 'math', 0)
