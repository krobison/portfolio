use kolten;

insert into sites (id,name,start_date,last_date,url,description) values (
	NULL,
	"Mines Events",
	"2013-11-01",
	"2013-12-10",
	"https://minesevents.com/index.php",
	"A site to organize and discover campus events at the Colorado School of Mines!"
);

insert into apps (id,name,start_date,last_date,description,genre,apptype,youtube,details) values (
	NULL,
	"Particle Library for OpenFrameworks",
	"2012-12-20",
	"2013-01-04",
	"A particle library addon for OpenFrameworks",
	"Graphical Interface",
	"cPlusPlus",
	"//www.youtube.com/embed/Q1SlyXMaXj4",
	"The particle library was an experiment of mine to see if I could create smooth, quality effects using only geometric shapes rather than leveraging complex graphical libraries."
),
(
	NULL,
	"PEBPAP",
	"2013-01-25",
	"2013-02-04",
	"A small and simple ecological simulation of beetle pigmentation evolution.",
	"Simulation",
	"cPlusPlus",
	"//www.youtube.com/embed/i_R3ePu-bUw",
	"PEBPAP (The Pigmentary Evolution in Beetle Populations due to Avian Predation) was a small simulation that I wrote early on in second semester of my Sophomore year in college. The beetle population is represented by little colored circles. There are many (about twenty) settable parameters to control the rates of things in the game. Over time birds, represented by black triangles, fly overhead to search for beetles. If they find one (using an algorithm to detect things that look 'different' from the background color), they will 'eat' it, and it will die. The beetles, over time, repopulate if there is enough space. The offspring are created between two random parent beetles, and emulate a heterozygous genetic cross to determine the offspring's color. Theoretically, over time, the beetles should blend in to the background, given that the genetic potential to become colored so exists in the initial population, and that the beetles do not become extinct."
);