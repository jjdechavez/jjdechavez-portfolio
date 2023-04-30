port module Effect exposing
    ( Effect
    , none, batch
    , sendCmd, sendMsg
    , pushRoute, replaceRoute, loadExternalUrl
    , map, toCmd
    , clearProjects, fetchProjects, jumpToProjects, saveProjects
    )

{-|

@docs Effect
@docs none, batch
@docs sendCmd, sendMsg
@docs pushRoute, replaceRoute, loadExternalUrl

@docs map, toCmd

-}

import Browser.Navigation
import Dict exposing (Dict)
import Json.Encode
import Route exposing (Route)
import Route.Path
import Route.Query
import Shared.Model
import Shared.Msg
import Task
import Url exposing (Url)


type Effect msg
    = -- BASICS
      None
    | Batch (List (Effect msg))
    | SendCmd (Cmd msg)
      -- ROUTING
    | PushUrl String
    | ReplaceUrl String
    | LoadExternalUrl String
      -- SHARED
    | SendSharedMsg Shared.Msg.Msg
    | SendToLocalStorage { key : String, value : Json.Encode.Value }
    | ScrollToProjects Bool



-- BASICS


{-| Don't send any effect.
-}
none : Effect msg
none =
    None


{-| Send multiple effects at once.
-}
batch : List (Effect msg) -> Effect msg
batch =
    Batch


{-| Send a normal `Cmd msg` as an effect, something like `Http.get` or `Random.generate`.
-}
sendCmd : Cmd msg -> Effect msg
sendCmd =
    SendCmd


{-| Send a message as an effect. Useful when emitting events from UI components.
-}
sendMsg : msg -> Effect msg
sendMsg msg =
    Task.succeed msg
        |> Task.perform identity
        |> SendCmd



-- ROUTING


{-| Set the new route, and make the back button go back to the current route.
-}
pushRoute :
    { path : Route.Path.Path
    , query : Dict String String
    , hash : Maybe String
    }
    -> Effect msg
pushRoute route =
    PushUrl (Route.toString route)


{-| Set the new route, but replace the previous one, so clicking the back
button **won't** go back to the previous route.
-}
replaceRoute :
    { path : Route.Path.Path
    , query : Dict String String
    , hash : Maybe String
    }
    -> Effect msg
replaceRoute route =
    ReplaceUrl (Route.toString route)


{-| Redirect users to a new URL, somewhere external your web application.
-}
loadExternalUrl : String -> Effect msg
loadExternalUrl =
    LoadExternalUrl



-- INTERNALS


{-| Elm Land depends on this function to connect pages and layouts
together into the overall app.
-}
map : (msg1 -> msg2) -> Effect msg1 -> Effect msg2
map fn effect =
    case effect of
        None ->
            None

        Batch list ->
            Batch (List.map (map fn) list)

        SendCmd cmd ->
            SendCmd (Cmd.map fn cmd)

        PushUrl url ->
            PushUrl url

        ReplaceUrl url ->
            ReplaceUrl url

        LoadExternalUrl url ->
            LoadExternalUrl url

        SendSharedMsg sharedMsg ->
            SendSharedMsg sharedMsg

        SendToLocalStorage value ->
            SendToLocalStorage value

        ScrollToProjects scrolling ->
            ScrollToProjects scrolling


{-| Elm Land depends on this function to perform your effects.
-}
toCmd :
    { key : Browser.Navigation.Key
    , url : Url
    , shared : Shared.Model.Model
    , fromSharedMsg : Shared.Msg.Msg -> msg
    , fromCmd : Cmd msg -> msg
    , toCmd : msg -> Cmd msg
    }
    -> Effect msg
    -> Cmd msg
toCmd options effect =
    case effect of
        None ->
            Cmd.none

        Batch list ->
            Cmd.batch (List.map (toCmd options) list)

        SendCmd cmd ->
            cmd

        PushUrl url ->
            Browser.Navigation.pushUrl options.key url

        ReplaceUrl url ->
            Browser.Navigation.replaceUrl options.key url

        LoadExternalUrl url ->
            Browser.Navigation.load url

        SendSharedMsg sharedMsg ->
            Task.succeed sharedMsg
                |> Task.perform options.fromSharedMsg

        SendToLocalStorage value ->
            sendToLocalStorage value

        ScrollToProjects scrolling ->
            scrollToProjects scrolling



-- SHARED


fetchProjects :
    List Shared.Model.Project
    -> Effect msg
fetchProjects projects =
    SendSharedMsg (Shared.Msg.FetchProjects projects)


port sendToLocalStorage :
    { key : String
    , value : Json.Encode.Value
    }
    -> Cmd msg


saveProjects :
    List Shared.Model.Project
    -> Effect msg
saveProjects projects =
    SendToLocalStorage
        { key = "x-projects"
        , value =
            Json.Encode.list projectEncoder projects
        }


projectTypeEncoder : Shared.Model.ProjectType -> Json.Encode.Value
projectTypeEncoder projectType =
    Json.Encode.string <|
        case projectType of
            Shared.Model.Expercience ->
                "EXPERCIENCE"

            Shared.Model.Personal ->
                "PERSONAL"

            _ ->
                "ALL"


projectEncoder :
    Shared.Model.Project
    -> Json.Encode.Value
projectEncoder project =
    Json.Encode.object
        [ ( "slug", Json.Encode.string project.slug )
        , ( "name", Json.Encode.string project.name )
        , ( "description", Json.Encode.string project.description )
        , ( "technologies", Json.Encode.list Json.Encode.string project.technologies )
        , ( "link", Json.Encode.string project.link )
        , ( "coverImage", Json.Encode.string project.coverImage )
        , ( "endedAt", Json.Encode.string project.endedAt )
        , ( "projectType", projectTypeEncoder project.projectType )
        ]


clearProjects : Effect msg
clearProjects =
    SendToLocalStorage
        { key = "x-projects"
        , value = Json.Encode.null
        }


port scrollToProjects : Bool -> Cmd msg


jumpToProjects : Bool -> Effect msg
jumpToProjects jumping =
    ScrollToProjects jumping