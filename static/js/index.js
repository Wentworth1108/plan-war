function showError(resp) {
    resp.json().then(function (result) {
        console.log('Error: ' + result.message);
    });
}

$(function () {
    var vm = new Vue({
        el: '#vm',
        http: {
            timeout: 5000
        },
        data: {
            records: [],
            loading: false
        },
        created: function () {
            this.init();
        },
        methods: {
            init: function () {
                var that = this;
                that.loading = true;
                that.$resource('/api/records').get().then(function (resp) {
                    that.loading = false;
                    resp.json().then(function (result) {
                        that.records = result.records;
                    });
                }, function (resp) {
                    that.loading = false;
                    showError(resp);
                });
            },
            create: function (record) {
                var that = this;
                that.$resource('/api/records').save(record).then(function (resp) {
                    resp.json().then(function (result) {
                        that.records.push(result);
                        that.records.sort(function(a,b){return b.score-a.score});
                    });
                }, showError);
            },
            remove: function (record) {
                var that = this;
                that.$resource('/api/records/' + record.id).delete().then(function (resp) {
                    var i, index = -1;
                    for (i=0; i<that.records.length; i++) {
                        if (that.records[i].id === record.id) {
                            index = i;
                            break;
                        }
                    }
                    if (index >= 0) {
                        that.records.splice(index, 1);
                    }
                }, showError);
            }
        }
    });
    window.vm = vm;

});
