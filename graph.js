/*global Viva*/
var graph = Viva.Graph.graph();
var addedNodes = [];

// Assumed to be a tree
var nodeData = {
    'root': {
        'target': null,
        'label' : 'BurgerX',
        'text'  : 'So we want to market <b>BurgerX</b>.',
        'size'  : 2,
        'img'   : 'burger.png',
    },
    '1': {
        'target': 'root',
        'label' : 'Advertisement',
        'text'  : '<b>Advertisements</b> always worked quite good for us.',
        'size'  : 1.4,
        'img'   : 'ad.jpg',
    },
    '2': {
        'target': '1',
        'label' : 'News papers',
        'text'  : 'We could make use of some large ads in <b>news papers</b>.',
        'size'  : 1.2,
        'img'   : 'news.jpg',
    },
    '3': {
        'target': '1',
        'label' : 'Magazines',
        'text'  : '<b>Magazine</b> advertorials also work too.',
        'size'  : 1.2,
        'img'   : 'magazine.jpg',
    },
    '4': {
        'target': 'root',
        'label' : 'Mouth to mouth',
        'text'  : '<b>Mouth to mouth</b> has always been important.',
        'size'  : 1.4,
        'img'   : 'mouth.jpg',
    },
    '5': {
        'target': '4',
        'label' : 'Social media',
        'text'  : 'Although we have never used it, our competitors seem to really benefit from <b>social media</b>.',
        'size'  : 1.1,
        'img'   : 'social-media.jpg',
    },
    '6': {
        'target': '4',
        'label' : 'Influencers',
        'text'  : 'We could contact some <b>influencers</b> to get some traction on social media.',
        'size'  : 1,
        'img'   : 'influencers.png',
    },
    '7': {
        'target': 'test5',
        'label' : 'test',
        'text'  : '',
        'size'  : 1,
        'img'   : 'burger.png',
    },
    '8': {
        'target': 'test5',
        'label' : 'test',
        'size'  : 1,
        'img'   : 'burger.png',
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
        img: nodeData[name].img,
        label: nodeData[name].label,
        size: nodeData[name].size,
    };

    graph.addNode(name, data);

    var target = nodeData[name].target;

    if (target !== null) {
        graph.addLink(name, target);
    }
}

function onLoad() {
    var layout = Viva.Graph.Layout.forceDirected(graph, {
        springLength: 20,
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
            .attr('font-size', 8 * node.data.size)
            .text(node.data.label)
        ;
        var img = Viva.Graph.svg('image')
                .attr('width', 32 * node.data.size)
                .attr('height', 32 * node.data.size)
                .link('img/' + node.data.img)
        ;

        ui.append(svgText);
        ui.append(img);

        ui.data = node.data;

        var pos = layout.getNodePosition(node.id);
        placeNode(ui, pos);

        // Make the nodes click-able
        $(ui).click(function() {
            // Update the suggestions window.
            $("#suggestions").attr('src', 'https://duckduckgo.com?q=' + node.data.label);
        });

        return ui;
    }

    function placeNode(nodeUI, pos) {
        nodeUI.attr('transform',
            'translate(' +
            (pos.x - 24) + ',' + (pos.y - 24) +
            ')');
    }
}
