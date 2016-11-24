/**
 * Created by slipkinem on 2016/11/24.
 */
'use strict';

(function ($) {
    $(function () {
        function createPost(request) {
            $.ajax({
                url: '/posts',
                method: 'POST',
                data: request
            })
                .success(function (data) {
                    if (data){
                        console.log(data);
                    }
                })
                .error(function (err) {
                    console.error(err);
                })
        }

        $('#submit-post').click(function () {
            var requestData = {
                title: $('#create-post input').val(),
                content: $('#create-post textarea').val()
            };
            createPost(requestData);
        });
    })
})(jQuery);