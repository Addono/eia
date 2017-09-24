/*global Viva*/
var graph = Viva.Graph.graph();
var addedNodes = [];

// Assumed to be a tree
var nodeData = {
    'root': {
        'target': null,
        'label' : 'BurgerX',
    },
    '1': {
        'target': 'root',
        'label' : 'Advertisement',
    },
    '2': {
        'target': '1',
        'label' : 'News papers',
    },
    '3': {
        'target': '1',
        'label' : 'Magazines',
    },
    '4': {
        'target': 'root',
        'label' : 'wut',
    },
    '5': {
        'target': 'test3',
        'label' : 'test',
    },
    '6': {
        'target': 'test5',
        'label' : 'test',
    },
    '7': {
        'target': 'test5',
        'label' : 'test',
    },
    '8': {
        'target': 'test5',
        'label' : 'test',
    },
};

var initNodes = [
    'root',
    'test',
    'test2',
    'test3',
];

// for (i = 0; i < initNodes.length; i++) {
//     var name = initNodes[i];
//     spawnNode(name);
// }

function spawnNode(name) {
    // Check if the node was already added.
    if (addedNodes.indexOf(name) !== -1) {
        return;
    }

    addedNodes.push(name);

    var data = {
        width: 25,
        height: 25,
        type: 'test',
        target: nodeData[name].target,
        label: nodeData[name].label
    };

    graph.addNode(name, data);

    var target = nodeData[name].target;

    if (target !== null) {
        graph.addLink(name, target);
    }
}

function onLoad() {
    var layout = Viva.Graph.Layout.forceDirected(graph, {
        springLength: 8,
        springCoeff: 0.0001,
        dragCoeff: 0.03,
        gravity: -10
    });

    var graphics = Viva.Graph.View.svgGraphics();
    graphics.node(createNodeUI).placeNode(placeNode);

    var renderer = Viva.Graph.View.renderer(graph, {
        layout     : layout,
        container  : document.getElementById('graphContainer'),
        graphics   : graphics
    });
    renderer.run();

    function createNodeUI(node){
        var ui = Viva.Graph.svg('g');
        var svgText = Viva.Graph.svg('text')
            .attr('y', '-4px')
            .attr('fill', '#222222')
            .text(node.data.label)
        ;
        var img = Viva.Graph.svg('image')
                .attr('width', 32)
                .attr('height', 32)
                .link('img/' + node.data.type + '.jpg')
        ;

        ui.append(svgText);
        ui.append(img);

        ui.data = node.data;

        var pos = layout.getNodePosition(node.id);
        placeNode(ui, pos);
        return ui;
    }

    function placeNode(nodeUI, pos) {
        nodeUI.attr('transform',
            'translate(' +
            (pos.x - 16) + ',' + (pos.y - 16) +
            ')');
    }
}
