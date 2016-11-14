var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = db.define('page', {
	//schema
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    urlTitle: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed'),
    },

    date: {
    	type: Sequelize.DATE,
    	defaultValue: Sequelize.NOW
    },
},

//options
{
	getterMethods: {
		route: function() {
        	var urlTitle = this.getDataValue('urlTitle');
        	return '/wiki/' + this.getDataValue('urlTitle');
        },
	},

	hooks: {
		beforeValidate: function(page, options) {
			if(page.title) {
				page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
			} else {
				page.title = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
				page.urlTitle = page.title;
			}
		}
	}
});




var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});


module.exports = {
  Page: Page,
  User: User
};

