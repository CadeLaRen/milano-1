A.app({
  appName: "МИЛАНО",
  appIcon: "hotel",
  onlyAuthenticated: true,
  menuItems: [
	  {
        name: "Orders",
        entityTypeId: "Orders",
        icon: "sort"
	},
    {
      name: "Clients",
      entityTypeId: "Clients",
      icon: "user"
    }, {
      name: "Objects",
      entityTypeId: "Objects",
      icon: "bars"
    }
  ],
  entities: function(Fields) {
    return {
      Orders: {
        fields: {
          client: Fields.reference("Clients", "Clients").required(),
          object: Fields.fixedReference("Object", "Objects").required(),
          start: Fields.date("Start").required(),
          stop: Fields.date("Stop").required(),
		  days : Fields.integer("Days").readOnly(),
          costs: Fields.money("Costs").computed("sum(object.costs)").addToTotalRow().readOnly(),//Fields.relation('Costs', 'Objects', 'costs'),
		  discount: Fields.money("Discount"),
		  deposit: Fields.money("Deposit")
	  },
	  referenceName: "client"
      },
      Objects: {
        fields: {
          name: Fields.text("Name").required(),
		  costs : Fields.money("Costs").required(),
		  position: Fields.integer("Position"),
		  orders : Fields.relation('Orders', 'Orders', 'object')
        },
        sorting: [['position', 1]],
        referenceName: "name"
	},
	Clients: {
	  fields: {
		name: Fields.text("Name").required(),
		phone: Fields.text("Phone").required(),
		registration: Fields.text("Registration").required(),
		created : Fields.date("Created").required()
	  },
	  referenceName: "name"
	}
    }
  }
});
