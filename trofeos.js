new Vue({
    el: "#app",
    //Definimos los datos para utilizarlos en el html
    data: {
        textSearch: "",
        trans: []
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
                "url": "https://mlb-data.p.rapidapi.com/json/named.transaction_all.bam",
                "headers": {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": "mlb-data.p.rapidapi.com",
                    "x-rapidapi-key": "1b88db14c7mshde61de2cc563b21p1062b4jsnfbc5df163f5a"
                },
                "params": {
                    "end_date": "'20171231'",
                    "start_date": "'20171201'",
                    "sport_code": "'mlb'"
                }
            })
            .then((response) => {
                this.trans = response.data.transaction_all.queryResults.row;
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })

    },

    computed: {
        transFilter() {
            var textSearch = this.textSearch;
            return this.trans.filter(function(el) {
                return el.player.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1;
            });
        }
    }


});