/*jshint esversion: 6 */
$('#scraper').on('click', () => {
  $.ajax({
    method: 'GET',
    url: '/scrape',
  }).then(data => {
      // Reload the page to get the updated list
      location.assign('/');
      console.log('start scraping button sent ajax call');
    }
  );
});

//When "Save Article" button is clicked, that article is saved in collection
$(document).on('click', '.save-btn', function () {
  //Save the title of the selected article
  const title = $(this).attr('data-title');
  const link = $(this).attr('data-link');

  console.log(`Title: ${title}`);
  console.log(`Link: ${link}`);

  //Ajax call for the article
  $.ajax({
    method: 'POST',
    url: '/articles',
    data: { title: title, link: link },
  }).then(data => {
    console.log('Article saved in the collection!');
  });
});

// When "Saved Articles" button is clicked, send an ajax call to bring saved articles
$('#collection').on('click', () => {
  $.ajax({
    method: 'GET',
    url: '/articles',
  }).then(data => {
    // Reload new page to get the saved articles list
    location.assign('/articles');
    console.log('saved articles button sent ajax call');
  });
});

    // Ajax call for the selected article
    $.ajax({
      method: 'DELETE',
      url: '/articles',
      data: { id: id },
    }).then(data => {
      location.reload();
      console.log('Article deleted from the collection!');
    });
  });

let articleId = null;

// When "Article Notes" is clicked, save the id of the article
// Send an ajax call to populate notes
$(document).on('click', '.add-note', function () {
    // Save the id of the selected article
    articleId = $(this).attr('data-id');

    console.log(`articleId: ${articleId}`);

    $.ajax({
      method: 'GET',
      url: '/articles',
      data: { id: articleId },
    }).then(data => {
      console.log('Notes are populated');
    });
  });

// When "Save your note" button clicked in modal, send an ajax call to save it
$('.save-note').on('click', () => {
      const title = $('#note-title').val().trim();
      const body = $('#note-body').val().trim();

      // Ajax call for saving the note
      $.ajax({
        method: 'POST',
        url: '/notes',
        data: { id: articleId, title: title, body: body },
      }).then(data => {
        console.log('Article saved in the collection!');
      });
      console.log('Note saved');
      console.log(`articleId: ${articleId}`);

      $('#note-title').val('');
      $('#note-body').val('');
    });
