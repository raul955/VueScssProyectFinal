new Vue({
    el: "#app",
    //Definimos los datos para utilizarlos en el html
    data: {
        textSearch: "",
        teams: []
    },
    // Ahora hacemos uso de los hooks, que son los diferentes estados por los que puede pasar un componente
    // podéis leer más en https://elabismodenull.wordpress.com/2017/05/05/vuejs-el-ciclo-de-vida-de-un-componente/
    // en este caso podríamos hacerlo tanto en created como en mounted, pero sería más apropiado en created ya que no estamos 
    // accediendo al DOM
    created() {
        //Ahora obtenemos datos de la API, en algunos ejemplos vemos axios.get, pero podemos usar esta forma (por comodidad principalmente
        //ya que desde RapidAPI nos dan este formato)
        axios({
                "method": "GET",
                "url": "https://mlb-data.p.rapidapi.com/json/named.team_all_season.bam",
                "headers": {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": "mlb-data.p.rapidapi.com",
                    "x-rapidapi-key": "1b88db14c7mshde61de2cc563b21p1062b4jsnfbc5df163f5a"
                },
                "params": {
                    "all_star_sw": "'N'",
                    "sort_order": "name_asc",
                    "season": "'2017'"
                }
            })
            .then((response) => {
                this.teams = response.data.team_all_season.queryResults.row;
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })

    },
    computed: {
        teamsFilter() {
            var textSearch = this.textSearch;
            return this.teams.filter(function(el) {
                return el.name_display_full.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1;
            });
        }
    }

});