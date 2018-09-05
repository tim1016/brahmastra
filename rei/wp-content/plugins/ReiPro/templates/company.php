<div class="wrap">
    <h1>Company Details</h1>
    <?php settings_errors( );?>

    <div >
        <div>
            <form action="options.php" method="POST">
                <?php 
                    settings_fields( 'reipro_company_settings' );
                    do_settings_sections( 'rei_company' );
                    submit_button();
                ?>
            </form>
        </div>
    </div>

</div>