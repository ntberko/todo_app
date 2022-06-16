<?php

declare(strict_types=1);
include 'db_func.php';

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->get('/get/{note}', function (Request $request, Response $response, array $args) {
        $note = $args['note'];
        $return = db_get_note($note);
        $response->getBody()->write($return);
        return $response;
    });

    $app->get('/getall', function (Request $request, Response $response, array $args) {
        $return = db_get_all_notes();
        $response->getBody()->write($return);
        return $response;
    });


    $app->get('/create/{note}', function (Request $request, Response $response, array $args) {
        $note = $args['note'];
        db_create_note($note);
        $response->getBody()->write('New ToDo withe ID '. $note.' Created');
        return $response;
    });

    $app->get('/delete/{noteid}', function (Request $request, Response $response, array $args) {
        $noteid = $args['noteid'];
        db_delete_note($noteid);
        $response->getBody()->write('ToDo '. $noteid. ' was Deleted');
        return $response;
    });

    $app->get('/checked/{noteid}', function (Request $request, Response $response, array $args) {
        $noteid = $args['noteid'];
        db_checked_note($noteid);
        $response->getBody()->write('Hello world!'. $noteid);
        return $response;
    });


    $app->get('/update/{noteid}/{text}/', function (Request $request, Response $response, array $args) {
        $noteid = $args['noteid'];
        $text = $args['text'];
        db_update_note($noteid, $text);
        $response->getBody()->write('Hello world!'. $noteid);
        return $response;
    });




    $app->group('/users', function (Group $group) {
        $group->get('', ListUsersAction::class);
        $group->get('/{id}', ViewUserAction::class);
    });
};
