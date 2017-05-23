<html style="height: auto;" ng-app="larakit">
<head>
    <meta charset="utf-8">
    <base href="/"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="shortcut icon" href="/favicon.ico"/>
    <title>Test</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    {!! laracss() !!}
</head>
<body class="skin-black" style="height: auto;" ng-class="{
        'sidebar-collapse':leftValue(),
        'control-sidebar-open':rightValue(),
}">
{{--<div class="label" ng-class="{'label-danger':$ctrl.leftValue(), 'label-success':!$ctrl.leftValue()}" >L (свернуто):<span ng-bind="$ctrl.leftValue()"></span></div>--}}
{{--<br>--}}
{{--<div class="label" ng-class="{'label-danger':!$ctrl.rightValue(), 'label-success':$ctrl.rightValue()}" >R (развернуто):<span ng-bind="$ctrl.rightValue()"></span></div>--}}
{{--<br>--}}
{{--<div class="label" ng-class="{'label-danger':$ctrl.leftCookie(), 'label-success':!$ctrl.leftCookie()}" >leftCookie (свернуто):<span ng-bind="$ctrl.leftCookie()"></span></div>--}}
{{--<br>--}}
{{--<div class="label" ng-class="{'label-danger':!$ctrl.rightCookie(), 'label-success':$ctrl.rightCookie()}" >rightCookie (развернуто):<span ng-bind="$ctrl.rightCookie()"></span></div>--}}
{{--<br>--}}
<div class="wrapper" style="height: auto;">
    <ng-view></ng-view>
</div>
{!! larajs() !!}
</body>
</html>