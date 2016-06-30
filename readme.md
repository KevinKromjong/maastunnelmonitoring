#Maastunnelmonitoring#

##Algemeen##

Het prototype is gebouwd door middel van het framework Laravel. De database betreft een NoSQL-database. Hiervoor is gekozen voor MongoDB. Daarnaast wordt alles gehost op een DigitalOcean server, die te vinden is op http://146.185.130.75/

##Uitleg mappen/bestanden##

####Laravel####

De belangrijkste mappen in de repository, zijn:

**App**

Hierin zijn onder andere de Controllers en Models te vinden. Daarnaast bevindt zich in Console/Kernel.php de code om de dummydata te genereren. Dit wordt door middel van een cronjob op de server gedaan.

**Config**

Hierin bevinden zich alle configuratiebestanden. Onder andere de URL naar de omgeving en de gegevens voor de database kunnen in de bestanden in deze map worden aangepast.

**Public**

Deze map bevat alle HTML-, CSS-, Javascript-bestanden, lettertypen en afbeeldingen.

**Resources**

Deze map bevat alle Views en language-bestanden

Voor de volledige beschrijving van alle mappen en eventueel niet genoemde en/of aanwezige bestanden, wordt verwezen naar [deze Laravelpagina](https://laravel.com/docs/master/structure).


####MongoDB####

De dummydata die de Kernel.php genereert, omvat het volgende formaat in JSON:

```
{
	"_id": ObjectId("5773c7f604e89e36e46a4966"),
	"mod_id": 20,
	"sensor_type": "fan",
	"tunnel": "west",
	"direction": "south",
	"fan_number": 3,
	"is_on": false,
	"fan_state": 0,
	"blow_direction": "south",
	"power_usage": 0,
	"updated_at": ISODate("2016-06-29T13:07:02.404Z"),
	"created_at": ISODate("2016-06-29T13:07:02.404Z")
}
```



Hierbij is:

| Keys        | Betekenis           | Voorbeeld / Formaat  |
| ------------- |:-------------:| -----:|
| _id      | De identifier van het ventilatorobject | Een getal dat door MongoDB zelf gegenereerd wordt |
| mod_id     | De counter van het ventilatorobject. Nummer 12 is dus het twaalfde ingeschoten object      |   Een numeriek getal |
| sensor_type | het type sensor      | `fan`, `temperature`, `air_pollution` |
| tunnel | De tunnelbuis      | `east` of `west` (oost- en westbuis) |
| direction | De richting van de tunnel | `north` of `zuid` (noord- en zuidkant) |
| fan_number | Het nummer van de ventilator in de desbetreffende buis en richting   | 1 t/m 3 of 1 t/m 5 (afhangend van de tunnel en richting) |
| is_on | Of de ventilator aan of uit staat      |  `true` of `false` |
| fan_state | De draaistand van de ventilator      |  `0` t/m `8` |
| blow_direction | De blaasrichting van de ventilator      | `north` of `south` |
| power_usage | Het stroomverbruik van de ventilator      | Een numeriek getal |
| updated_at | Wanneer het object voor het laatst is geupdate      | een datum in het ISODate formaat |
| created_at |  Wanneer het object is aangemaakt     | een datum in het ISODate formaat |



##Installatie##

Om het prototype online in actie te zien, moet deze op een Virtual Private Server (VPS) worden geinstalleerd. Hieronder volgen de stappen die ondernomen moeten worden om dit te doen.

*Let op: dit zijn de stappen om de Laravel-installatie werkende te krijgen op een DigitalOcean server. Mocht er voor een andere server gekozen worden, dan gelden deze stappen waarschijnlijk niet!*

####DigitalOcean####

Het prototype wordt op dit moment gehost op een DigitalOcean VPS. Hierbij is voor het meest linkse abonnement gekozen, die van 5 dollar per maand:

![DigitalOcean abonnement](http://www.htpcbeginner.com/images/2014/04/digitalocean-plans-500x208.png)

Als het abonnement afgesloten is, kan er een VPS worden opgezet, een zogenaamde `droplet`. Een Droplet kan handmatig ingesteld worden, maar er zijn ook vooraf ingestelde paketten met bijvoorbeeld een Wordpress of Magento-installatie, zodat dit niet handmatig gedaan hoeft te worden. Zo is er ook een pakket met MongoDB. 

Bij het aanmaken van een `droplet` moet er eerst worden gekozen voor een besturingssysteem. Echter, om het pakket met MongoDB te kiezen, moet er van `Distributions` naar `One-click apps` worden geschakeld. Als er op `One-click apps` is geklikt, verschijnt er een lijst met kant en klare paketten. Hier kan MongoDB geselecteerd worden die, op het moment van schrijven, draait op Ubuntu 14.04.

Als er naar onder wordt gescrold kan de grootte van de server gekozen worden. De meest kleine server, 5 dollar per maand, is voldoende.

Vervolgens moet er voor een datacenter gekozen worden. Aangeraden wordt om voor Amsterdam te kiezen, aangezien de snelheid van de server hierdoor het best is.

Daarnaast hoeven er geen extra opties geselecteerd te worden. Wel moet er een SSH-key worden aangemaakt. Hoe dit gedaan kan worden is [!hier](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-digitalocean-droplets) te lezen voor Mac/Ubuntu-gebruikers en [!hier](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-putty-on-digitalocean-droplets-windows-users) voor Windows-gebruikers

Tenslotte hoeft er maar 1 `droplet` aangemaakt te worden en mag er een naam aan gegeven worden. De naam mag van alles zijn. Daarna kan de droplet aangemaakt worden.

####Nginx & Laravel####
Nu de server op is gezet, kan de software voor de server worden geinstalleerd. Nadat deze is geinstalleerd kan de Laravel-installatie op de server worden gezet. Hoe dit gedaan moet worden is [!hier](https://www.digitalocean.com/community/tutorials/how-to-install-laravel-with-an-nginx-web-server-on-ubuntu-14-04) te vinden.


