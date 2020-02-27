const ORDER = ["meta", "double"];

function getOrderMap() {
  const orderMap = new Map();

  ORDER.forEach((name, i) => {
    orderMap.set(name, i);
  });

  return orderMap;
}

module.exports = {
  create(context) {
    const orderMap = getOrderMap();

    function checkOrder(propertiesNodes) {
      const properties = propertiesNodes
        .filter(property => property.type === "Property")
        .map(property => property.key);

      properties.forEach((property, i) => {
        const propertiesAbove = properties.slice(0, i);
        const unorderedProperties = propertiesAbove
          .filter(p => orderMap.get(p.name) > orderMap.get(property.name))
          .sort((p1, p2) => orderMap.get(p1.name) > orderMap.get(p2.name));

        const firstUnorderedProperty = unorderedProperties[0];

        if (firstUnorderedProperty) {
          const line = firstUnorderedProperty.loc.start.line;

          context.report({
            node: property,
            message: `The "{{name}}" property should be above the "{{firstUnorderedPropertyName}}" property on line {{line}}.`,
            data: {
              name: property.name,
              firstUnorderedPropertyName: firstUnorderedProperty.name,
              line
            }
          });
        }
      });
    }

    return {
      VariableDeclarator(node) {
        const isBarObj =
          node.id.name === "bar" && node.init.type === "ObjectExpression";

        if (!isBarObj) return;

        checkOrder(node.init.properties);
      }
    };
  }
};
