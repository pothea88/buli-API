$(document).ready(function(){
    database.collection('homework').get().then(
        (data) =>{
            var result = "";
            data.forEach(element => {
                result +=`
                    <div class="card shadow-lg mt-4">
                        <div class="card-header">
                            <img src="${element.data().profile}" class="img-fluid rounded-circle" width="50">
                            ${element.data().name}
                            <div class="container">
                                <button type="button" class="btn btn-info float-right btn-sm" data-toggle="modal" data-target="#myModal${element.id}">
                                    view
                                </button>
                                <div class="modal fade" id="myModal${element.id}">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            </div>
                                            <div class="modal-body">
                                                <img src="${element.data().post}" class="img-fluid rounded">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <img src="${element.data().post}" class="img-fluid rounded">
                        </div>
                        <div class="card-footer">
                            ${element.data().text}
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="deletePicture('${element.id}')">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            $('#result').append(result);
        }
    )
    $('#new').on('click',function(){
        var add_name = $('#name').val();
        var add_profile = $('#profile').val();
        var add_post = $('#post').val();
        var add_text = $('#text').val();
        database.collection('homework').add({
            name: add_name,
            profile: add_profile,
            post: add_post,
            text: add_text,
        });
        $('#name').val('');
        $('#profile').val('');
        $('#post').val('');
        $('#text').val('');
    });
    
});
function deletePicture (Id) {
    database.collection('homework').doc(Id).delete();
}
