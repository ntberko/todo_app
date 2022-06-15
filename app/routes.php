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

    $app->get('/create/{note}', function (Request $request, Response $response, array $args) {
        $note = $args['note'];
        db_create_note($note);
        $response->getBody()->write('Hello world!'. $note);
        return $response;
    });

    $app->get('/delete/{note}', function (Request $request, Response $response, array $args) {
        $note = $args['note'];
        db_delete_note($note);
        $response->getBody()->write('Hello world!'. $note);
        return $response;
    });

    $app->get('/checked/{note}', function (Request $request, Response $response, array $args) {
        $note = $args['note'];
        db_checked_note($note);
        $response->getBody()->write('Hello world!'. $note);
        return $response;
    });


    $app->get('/update/{noteid}/{text}/', function (Request $request, Response $response, array $args) {
        $noteid = $args['noteid'];
        $text = $args['text'];
        db_update_note($noteid, $text);
        $response->getBody()->write('Hello world!'. $note);
        return $response;
    });




    $app->group('/users', function (Group $group) {
        $group->get('', ListUsersAction::class);
        $group->get('/{id}', ViewUserAction::class);
    });
};
