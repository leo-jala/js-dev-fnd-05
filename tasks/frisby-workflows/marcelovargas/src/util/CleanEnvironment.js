// Clean Environment
var frisby = require('/usr/local/lib/node_modules/frisby');
var Util = require('./Util');

var CleanEnvironment = function(){
	Util = new Util();
	console.log('Util.getEncondedString():', Util.getEncondedString())
	frisby.globalSetup({
		request: {
			headers: {
				'Authorization': Util.getEncondedString()
			}
		}
	});
}

CleanEnvironment.prototype.cleanProjects = function(){
	frisby
		.create('todo.ly Clean projects')
		.get('https://todo.ly/api/projects.json')
		.expectStatus(200)
		.afterJSON(function(projects){
			for (var i = 0; i < projects.length; i++) {
				if(projects[i].Icon == 0)
				{
					frisby
					.create('todo.ly Delete project')
					.delete('https://todo.ly/api/projects/' + projects[i].Id + '.json')
					.expectStatus(200)
					.toss()
				}
			};
		})
		.toss()
}

module.exports = CleanEnvironment;