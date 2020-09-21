selain->palvelin: Lomakkeelle syötetty data (kun painaa "Submit" nappia) - HTTP POST REQUEST osoitteeseen /new_note 


note over palvelin:
Palvelin käsittelee POST pyynnön koodin.
Palvelin siis luo muistiinpanoa vastaavan olion,
ja liittää sen muistiinpanotaulukkoon.
end note


palvelin-->selain: Requestin status on 302, eli Redirect. Palvelin kertoo selaimelle tekemään uuden HTTP GET -pyynnön osoitteeseen /notes
palvelin-->selain: Selain lataa /notes sivun uudelleen, mukaan lukien main.css, main.js sekä data.json


note over selain:
Selain näyttää lomakkeella lähetetyn datan.
end note