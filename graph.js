/*global Viva*/
var graph = Viva.Graph.graph();
var addedNodes = [];

// Assumed to be a tree
var nodeData = {
    'root': {
        'target': null,
        'label' : 'BurgerX',
        'text'  : 'So we want to market <b>BurgerX</b>.',
    },
    '1': {
        'target': 'root',
        'label' : 'Advertisement',
        'text'  : '<b>Advertisements</b> always worked quite good for us.'
    },
    '2': {
        'target': '1',
        'label' : 'News papers',
        'text'  : 'We could make use of some large ads in <b>news papers</b>',
    },
    '3': {
        'target': '1',
        'label' : 'Magazines',
        'text'  : '<b>Magazine</b> advertorials also work too.',
    },
    '4': {
        'target': 'root',
        'label' : 'Mouth to mouth',
        'text'  : '<b>Mouth to mouth</b> has always been important.',
    },
    '5': {
        'target': '4',
        'label' : 'Social media',
        'text'  : 'Although we have never used it, our competitors seem to really benefit from <b>social media</b>',
    },
    '6': {
        'target': '5',
        'label' : 'Influencers',
        'text'  : 'We could contact some <b>influencers</b> to get some traction on social media.',
    },
    '7': {
        'target': 'test5',
        'label' : 'test',
        'text'  : '',
    },
    '8': {
        'target': 'test5',
        'label' : 'test',
    },
};

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
        springLength: 15,
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
