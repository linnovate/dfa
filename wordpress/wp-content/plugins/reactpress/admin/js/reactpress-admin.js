;(function ($) {
  'use strict'
  $(document).ready(function () {
    /*********
     * Start *
     *********/

    const AJAXURL = rp.ajaxurl

    $('#rp-create-form').validate()

    // processing event on button click
    $(document).on('submit', '#rp-create-form', handleSubmit)
    $('.button-build').click(handleBuildButton)
    $('.button-update').click(handleUpdateButton)
    $('.button-delete').click(handleDeleteButton)
    $('.button-link-to-slug').click(handleEditSlugButton)
    $('.button-edit-slug-cancel').click(handleEditSlugButton)
    $('.button-edit-slug-save').click(handleEditSlugSaveButton)

    function handleBuildButton(ev) {
      const buttonNode = $(ev.target)
      const { appname = null, pageslug = null } = buttonNode.data()
      const postdata = `action=repr_admin_ajax_request&param=build_react_app&appname=${appname}&pageslug=${pageslug}`
      const spinnerNode = $(`#rp-build-spinner-${appname}`)

      buttonNode.prop('disabled', true)
      spinnerNode.addClass('is-active')
      $.post(AJAXURL, postdata, (response) => {
        const result = JSON.parse(response)
        buttonNode.prop('disabled', false)
        spinnerNode.removeClass('is-active')
        showSnackbar(result.message)
      })
    }
    function handleDeleteButton(ev) {
      const buttonNode = $(ev.target)
      const { appname = null } = buttonNode.data()
      const is_delete = window.confirm(
        `Do you really want to delete app ${appname}? This will delete all files and cant\'t be undone!`
      )
      const postdata = `action=repr_admin_ajax_request&param=delete_react_app&appname=${appname}`
      if (is_delete) {
        $.post(AJAXURL, postdata, (response) => {
          const result = JSON.parse(response)
          if (result.status) {
            $(`#${appname}`).remove()
          }
          showSnackbar(result.message)
        })
      }
    }

    function handleEditSlugButton(ev) {
      const buttonNode = $(ev.target)
      const { appname = null } = buttonNode.data()
      const linkToSlug = $(`#link-to-slug-${appname}`)
      const editSlug = $(`#edit-slug-${appname}`)

      linkToSlug.toggle()
      editSlug.toggle()
    }

    function handleEditSlugSaveButton(ev) {
      const buttonNode = $(ev.target)
      const { appname = null } = buttonNode.data()
      const linkToSlug = $(`#link-to-slug-${appname}`)
      const editSlug = $(`#edit-slug-${appname}`)
      const editSlugInput = $(`#edit-slug-input-${appname}`)

      const postdata = `action=repr_admin_ajax_request&param=edit_url_slug&appname=${appname}&pageslug=${editSlugInput.val()}`
      $.post(AJAXURL, postdata, (response) => {
        const result = JSON.parse(response)
        if (!result.status) {
          showSnackbar(result.message)
        } else {
          linkToSlug
            .children()
            .first()
            .replaceWith(
              `<a class="inline-block lh1 pt05" href="${editSlugInput.val()}">${editSlugInput.val()}</a>`
            )
          linkToSlug.toggle()
          editSlug.toggle()
          location.reload()
        }
      })
    }

    function handleUpdateButton(ev) {
      const buttonNode = $(ev.target)
      const buttonState = buttonNode.text()
      const { appname = null, pageslug = null } = buttonNode.data()
      const postdata = `action=repr_admin_ajax_request&param=update_index_html&appname=${appname}&pageslug=${pageslug}`
      const spinnerNode = $(`#rp-start-spinner-${appname}`)

      buttonNode.prop('disabled', true)
      spinnerNode.addClass('is-active')
      $.post(AJAXURL, postdata, (response) => {
        const result = JSON.parse(response)
        buttonNode.prop('disabled', false)
        spinnerNode.removeClass('is-active')
        showSnackbar(result.message)
      })
    }

    function handleSubmit() {
      const appnameField = $('#rp-appname')
      const appname = appnameField.val()
      const fieldset = $('#rp-create-fieldset')
      const pageslugField = $('#rp-pageslug')
      const pageslug = pageslugField.val()
      const spinner = $('#rp-spinner')
      const templateSelect = $('#rp-template-select')
      const template = templateSelect.val()
      const typeRadio = $('input[name=type]:checked', '#rp-create-form')
      const type = typeRadio.val()
      const postdata = `action=repr_admin_ajax_request&param=create_react_app&appname=${appname}&pageslug=${pageslug}&template=${template}&type=${type}`

      fieldset.prop('disabled', true)
      spinner.addClass('is-active')
      $.post(AJAXURL, postdata, (response) => {
        const result = JSON.parse(response)
        if (result.status) {
          $('#existing-apps').append(
            appCardTemplate(result.appname, result.pageslug, type)
          )
          $(`#${appname} .button-update`).click(handleUpdateButton)
          $(`#${appname} .button-build`).click(handleBuildButton)
          $(`#${appname} .button-delete`).click(handleDeleteButton)

          $(`#${appname} .button-link-to-slug`).click(handleEditSlugButton)
          $(`#${appname} .button-edit-slug-cancel`).click(handleEditSlugButton)
          $(`#${appname} .button-edit-slug-save`).click(
            handleEditSlugSaveButton
          )
        }
        appnameField.val('')
        fieldset.prop('disabled', false)
        pageslugField.val('')
        $('#rp-template-select > option:first-child').prop('selected', true)
        typeRadio.prop('checked', false)
        spinner.removeClass('is-active')
        showSnackbar(result.message)
        location.reload()
      })
    }

    function showSnackbar(message = '') {
      $('#rp-snackbar').addClass('show').text(message)
      setTimeout(() => $('#rp-snackbar').removeClass('show').text(''), 5000)
    }

    /**
     * Produces the template for a newly created app.
     *
     * @param {string} appname
     * @param {string} pageslug
     * @param {string} type
     * @returns string
     * @since 1.0.0
     */

    function appCardTemplate(appname, pageslug, type) {
      return `<div id="${appname}" class="card col flex fullwidth m0 p2">
        <h3 class="title flex m0 mb-05 row">${react_logo()}${appname}</h3>
        <table class="form-table" role="presentation">
          <tbody>
              <tr>
                <th scope="row">URL Slug</th>
                <td>
                  <div id="link-to-slug-${appname}">
                    ${
                      !pageslug
                        ? `<i class="fg-grey inline-block lh1 pt05">Not set.</i>`
                        : `<a class="inline-block lh1 pt05" href="${pageslug}">${pageslug}</a>`
                    }
                    <button class="button button-icon button-link-to-slug" data-appname="${appname}">
                      <span class="dashicons dashicons-edit" data-appname="${appname}"></span>
                    </button>
                  </div>
                  <div id="edit-slug-${appname}" style="display: none;">
                    <input id="edit-slug-input-${appname}" type="text" value="${pageslug}"/> 
                    <button class="button button-primary button-edit-slug-save" id="edit-slug-save-${appname}" data-appname="${appname}" data-pageslug="${pageslug}">Save</button> 
                    <button class="button button-link button-edit-slug-cancel ml025" id="edit-slug-cancel-${appname}" data-appname="${appname}">Cancel</button>
                  </div>
                </td>
                  <a href="${pageslug}">${pageslug}</a>
                </td>
              </tr>
              <tr>
                <th scope="row">Type</th>
                <td>
                  <span style="text-transform: capitalize;">${type}</span>
                </td>
              </tr>
              ${
                type === 'deployment'
                  ? ''
                  : `<tr>
                <th scope="row">Update Dev-Environtment</th>
                <td>
                  <button class="button button-primary button-update" data-appname="${appname}" data-pageslug="${pageslug}">Update Dev-Environment</button>
              <span id="rp-start-spinner-${appname}" class="crpw-button-spinner spinner"></span>
              <p class="description">Update the <code>index.html</code> of your local react dev environment.</p>
              
                </td>
              </tr>
              <tr>
                <th scope="row">Build App</th>
                <td>
                    <span id="rp-build-spinner-${appname}" class="crpw-button-spinner spinner"></span>
              <button class="button button-build mr025" data-appname="${appname}" data-pageslug="${pageslug}">Build App</button>
              <p class="description">Build the app. All changes are reflected at the given slug.</p>

                </td>
              </tr>`
              }
              </tbody>
          </table>
          <div><button class="button-link button-delete" data-appname="${appname}" data-pageslug="${pageslug}">Delete App</button></div>
        </div>`
    }

    function react_logo() {
      return `<svg class="react" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><circle cx="12" cy="11.245" r="1.785" fill="#626262"></circle><path d="M7.002 14.794l-.395-.101c-2.934-.741-4.617-2.001-4.617-3.452c0-1.452 1.684-2.711 4.617-3.452l.395-.1l.111.391a19.507 19.507 0 0 0 1.136 2.983l.085.178l-.085.178c-.46.963-.841 1.961-1.136 2.985l-.111.39zm-.577-6.095c-2.229.628-3.598 1.586-3.598 2.542c0 .954 1.368 1.913 3.598 2.54c.273-.868.603-1.717.985-2.54a20.356 20.356 0 0 1-.985-2.542zm10.572 6.095l-.11-.392a19.628 19.628 0 0 0-1.137-2.984l-.085-.177l.085-.179c.46-.961.839-1.96 1.137-2.984l.11-.39l.395.1c2.935.741 4.617 2 4.617 3.453c0 1.452-1.683 2.711-4.617 3.452l-.395.101zm-.41-3.553c.4.866.733 1.718.987 2.54c2.23-.627 3.599-1.586 3.599-2.54c0-.956-1.368-1.913-3.599-2.542a20.683 20.683 0 0 1-.987 2.542z" fill="#626262"></path><path d="M6.419 8.695l-.11-.39c-.826-2.908-.576-4.991.687-5.717c1.235-.715 3.222.13 5.303 2.265l.284.292l-.284.291a19.718 19.718 0 0 0-2.02 2.474l-.113.162l-.196.016a19.646 19.646 0 0 0-3.157.509l-.394.098zm1.582-5.529c-.224 0-.422.049-.589.145c-.828.477-.974 2.138-.404 4.38c.891-.197 1.79-.338 2.696-.417a21.058 21.058 0 0 1 1.713-2.123c-1.303-1.267-2.533-1.985-3.416-1.985zm7.997 16.984c-1.188 0-2.714-.896-4.298-2.522l-.283-.291l.283-.29a19.827 19.827 0 0 0 2.021-2.477l.112-.16l.194-.019a19.473 19.473 0 0 0 3.158-.507l.395-.1l.111.391c.822 2.906.573 4.992-.688 5.718a1.978 1.978 0 0 1-1.005.257zm-3.415-2.82c1.302 1.267 2.533 1.986 3.415 1.986c.225 0 .423-.05.589-.145c.829-.478.976-2.142.404-4.384c-.89.198-1.79.34-2.698.419a20.526 20.526 0 0 1-1.71 2.124z" fill="#626262"></path><path d="M17.58 8.695l-.395-.099a19.477 19.477 0 0 0-3.158-.509l-.194-.017l-.112-.162A19.551 19.551 0 0 0 11.7 5.434l-.283-.291l.283-.29c2.08-2.134 4.066-2.979 5.303-2.265c1.262.727 1.513 2.81.688 5.717l-.111.39zm-3.287-1.421c.954.085 1.858.228 2.698.417c.571-2.242.425-3.903-.404-4.381c-.824-.477-2.375.253-4.004 1.841c.616.67 1.188 1.378 1.71 2.123zM8.001 20.15a1.983 1.983 0 0 1-1.005-.257c-1.263-.726-1.513-2.811-.688-5.718l.108-.391l.395.1c.964.243 2.026.414 3.158.507l.194.019l.113.16c.604.878 1.28 1.707 2.02 2.477l.284.29l-.284.291c-1.583 1.627-3.109 2.522-4.295 2.522zm-.993-5.362c-.57 2.242-.424 3.906.404 4.384c.825.47 2.371-.255 4.005-1.842a21.17 21.17 0 0 1-1.713-2.123a20.692 20.692 0 0 1-2.696-.419z" fill="#626262"></path><path d="M12 15.313c-.687 0-1.392-.029-2.1-.088l-.196-.017l-.113-.162a25.697 25.697 0 0 1-1.126-1.769a26.028 26.028 0 0 1-.971-1.859l-.084-.177l.084-.179c.299-.632.622-1.252.971-1.858c.347-.596.726-1.192 1.126-1.77l.113-.16l.196-.018a25.148 25.148 0 0 1 4.198 0l.194.019l.113.16a25.136 25.136 0 0 1 2.1 3.628l.083.179l-.083.177a24.742 24.742 0 0 1-2.1 3.628l-.113.162l-.194.017c-.706.057-1.412.087-2.098.087zm-1.834-.904c1.235.093 2.433.093 3.667 0a24.469 24.469 0 0 0 1.832-3.168a23.916 23.916 0 0 0-1.832-3.168a23.877 23.877 0 0 0-3.667 0a23.743 23.743 0 0 0-1.832 3.168a24.82 24.82 0 0 0 1.832 3.168z" fill="#626262"></path></svg>`
    }

    /*******
     * END *
     *******/
  })
})(jQuery)
