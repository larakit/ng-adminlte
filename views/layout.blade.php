<html style="height: auto;" ng-app="{{ env('LARAKIT_NG_APP', 'larakit') }}" ng-cloak>
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
<div class="wrapper" style="height: auto;"><ng-view></ng-view></div>
{!! larajs() !!}
</body>
</html>