# Collections

Collections are sub categories of the Central Data Catalog. They allow administrators of a NADA instance to group studies into what can be thought of as sub-catalogs of the Central Data Catalog.

Collections provide a number of benefits both from the user and the administrator perspective. From the users’ perspective, being able to filter and view groups (collections) of studies that logically belong together makes finding what they are looking for easier. From the administrators’ perspective, the ability to create collections of studies that may logically belong together facilitates the ability to decentralize the management of each collection of studies to specific administrators (for example collections can be managed by different departments in an institution). 

:::tip Note
The creation of collections will in general only be useful and necessary for large catalogs or for catalogs that desire more decentralized management of groups of studies by different departments.
:::

## Creating collections
 
*	Login to the Site administration using an administrator password.

*	Collections are managed and created by going to the Studies, Manage collections menu link.

![](~@imageBase/images/manage-studies.png)

*	There are no collections defined in the default NADA 4 installation. 

![](~@imageBase/images/no-collection.png)

*	To create a new collection click on the Create new collection button.

![](~@imageBase/images/new-collection.png)

 
A. Under Collection Identification, provide a short name for the collection. This will become the URL for the collection so pick carefully. For Title, fill in the fill title for the collection. This will be the name displayed at the top of the collection page.

B.	Fill in a 3 or four line short description of the collection. This text will display on the front end in the collections list. For examples  see: http://microdata.worldbank.org/index.php/contributing-catalogs

C.	Fill in a more detailed description of the collection. This will display on the About page for that collection. For example see:
http://microdata.worldbank.org/index.php/catalog/dhs/about


To format the page and include images it is possible to enter HTML code into this box: below is an example piece of code that includes an image.

```html
<img src="files/dhs-fp-01.jpg" alt="Health Surveys Image" class="about-photo">
<h2> Health Surveys Collection</h2>
<p align="justify">The Health Surveys collection aims to provide frequent
high quality and timely health data needed by the decision makers when designing
public health programs.</p>
<p>Health surveys provide useful information on health status and health
consumption and their determinants.</p>
```

Copy any images to be displayed  into the NADA “files” folder on your server
    
![](~@imageBase/images/collection-thumbnail.png)

D.	Upload a file to display next to the collection as it is listed on the collection page. NOTE: This image should be 82 X 82 pixels. If the upload does not work automatically then copy the thumbnail image to the “files” folder as shown above.

![](~@imageBase/images/collection-image.png)

E.	The Weight field determines in what order collections are shown in the collection list.  0,1,2,3 etc. 
The Select collection type drop-down is a system value to distinguish between collections that should be viewed as internal to the organization or external. For example, some collections may be made up entirely of studies from an organization outside the host catalog. These collections can be designated as external. The Section dropdown allows for the categorization as either a collection based on a specialized collection (like health) or based on a regional breakdown. Selecting Publish – publishes the collection.

:::tip Note
Collection types: NADA supports two types of collections
    
- Internal: These collection types are not displayed on the public front-end and can only be used for organized content for administrative purposes.
- External: These collections are listed on the front-end when published.
:::


- Click on Submit to save the changes.

To view the results click on the Preview link on the far right:

![](~@imageBase/images/collection-preview-link.png)
![](~@imageBase/images/collection-preview.png)
 
*	The new collection now also shows in the collection list on the Central Catalog About page (this is where the thumbnail and short description fields are displayed).

![](~@imageBase/images/collection-list.png)

*	Visiting the Dashboard will now also show the new collection listed below the Central Data Catalog. With a number of green buttons as shortcut links to manage the studies on the collection, assign administrators for the collection, a history of activity on the collection and a link to edit the collection as in the steps above.
 
![](~@imageBase/images/collection-in-dashboard.png)


## Manually adding studies to a collection

**There are 2 ways to get studies into the new catalog:**

*	The first is to upload a DDI and all its resources to the collection in the same way as described in the earlier section – Uploading a Study. Except instead of choosing Central Catalog chose the collection you want to upload the study to.
 
![](~@imageBase/images/upload-study.png)

*	Click on the Add Study button and upload a DDI and RDF and all your resources as described in the earlier section  – Uploading a Study
 
![](~@imageBase/images/hs-add-study.png)
 
*	Once a study is added in this way it displays in the Manage Studies list. Notice that the collection summary field shows that the study belongs to (is Owned By) the DHS collection (this was the Short name defined in the example when the Health Surveys Collection was created).

![](/images/collection-owner.png)

	- Also, note that the new study also appears in the Central Data Catalog

![](~@imageBase/images/ns-in-cdc.png)
 
All studies uploaded to collections will automatically be added to the Central Data Catalog in order to build a common search portal for all studies.



## Copying studies from one collection to another

*	The second way to add a study to a collection is to **Copy the study** from another collection into the new collection.

*	To copy a study already in the catalog to display in the new collection first make sure to be in the Manage Studies section for the collection you want to put studies into. To do this either use the Studies – Manage studies menu on the top or simply click on the Switch link next to the Manage Studies [Collection Title] heading.

![](~@imageBase/images/manage-collection.png)

*	Then Click on the Copy Studies blue button at the top right.

![](/images/copy-study.png) 

*	A list of all studies available to copy to the new collection is listed. Simply click on the Link button in green to copy the study to the collection. The button will turn red and say Unlink. To reverse the process and click the now red button.
 
![](~@imageBase/images/copy-study-list.png) 

*	Going back to the Manage Studies page for the collection will show the newly copied studies in the collection list. Also note that the Collection field now indicated DHS next to Central. DHS is in grey to indicate it is not owned (it is a copy) by that collection and the Central is in blue to show it is owned by the Central Data Catalog. Also note that because the study is not owned by this catalog it cannot be edited from this catalog – hence the publish\unpublish green button is absent for the copied studies

## Turning on the collection filter

The final step after creating the first collection is to enable the collection filter option in the Settings menus under Site Configurations – Survey catalog settings

![](~@imageBase/images/collection-filter-enable.png)

## Transferring study ownership

In the previous examples mention was made of studies uploaded to a catalog being owned by that catalog. There may be cases where transferring the ownership from one catalog to another will be desirable. This will become clearer in the next section on user roles but for now the next steps show how transferring ownership from one collection to another can be done.

*	Transferring ownership from one collection to another has to be done by the owner of the collection and from the collection it is currently owned by.
*	To transfer ownership Go to the Manage Studies screen and select the study to be transferred.  Open up the Edit Study page by clicking on the study Title.
*	On the right hand side of the screen click on the Transfer study owner link.

![](~@imageBase/images/transfer-study-owner.png)

*	Select the collection to transfer  from the dropdown box.

![](~@imageBase/images/transfer-study-owner-selection.png)
 
*	Click Transfer

*	Note: that when looking the study summary for the transferred study the Collection field now shows the study to belong (owned by) to the DHS collection and not Central anymore. Also note the option to Publish and unpublish is now active.

![](~@imageBase/images/study-summary.png)
 
*	To transfer ownership of a large number of studies all at once -  from the Manage Studies page – select the studies to be transferred (tick them in the box left of each study) and then from the top Batch Actions drop down, select Transfer owner – then apply.

![](~@imageBase/images/batch-action.png)
